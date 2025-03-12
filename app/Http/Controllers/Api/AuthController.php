<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

/**
 *
 */
class AuthController extends Controller
{
    //
    /**
     * @return Middleware[]
     */
    public static function middleware(): array
    {
        return [
            new Middleware('auth:sanctum', except: ['login']),
        ];
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request):JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $credentials = $request->only(['email', 'password']);
        $user = User::where('email', $request->email)->first();
        if ($user && Hash::check($request->password, $user->password))
        {
            Auth::guard('web')->login($user);
            $usrs=User::where('id',Auth::guard('web')->user()->id)
                ->get();

            if( is_null(Auth::guard('web')->user()->password_changed_at) ){
                return response()->json([
                    'success'=>false,
                    'user' => $user,
                    'token'=>null,
                    'message' => 'change_password'
                ],Response::HTTP_ACCEPTED);
            }

            if( is_null(Auth::guard('web')->user()->email_verified_at) ){
                return response()->json([
                    'success'=>false,
                    'user' => $user,
                    'token'=>null,
                    'message' => 'verify_mail'
                ],Response::HTTP_ACCEPTED);
            }

            if(!is_null(Auth::guard('web')->user()->email_verified_at) && !is_null(Auth::guard('web')->user()->password_changed_at))
            {
                $token=Auth::guard('web')->user()->createToken('user',['*'],Carbon::now()->addMinute(30))->plainTextToken;
                $varArray=explode("|",$token);
                $id=$varArray[0];
                $personalAccessTokens= DB::table('personal_access_tokens')->where('id', $id)->first();
                $token=$varArray[1];
                return response()->json([
                    'success'=>true,
                    'user'=>$user,
                    'token'=>$token,
                    'expires_at'=>$personalAccessTokens->expires_at,
                    'message'=>"Login OK"
                ],Response::HTTP_OK);
            }
        }
        return response()->json([
            'success'=>false,
            'user' => null,
            'token'=>null,
            'message'=>"Login failed"
        ],Response::HTTP_UNAUTHORIZED);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        //dd($request->user()->currentAccessToken()->delete());
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            "success"=>true,
            "message"=>"Logout ok"
        ],Response::HTTP_OK);
    }
    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function changePassword(Request $request): JsonResponse
    {

        $user=User::where('email',base64_decode($request->email))->first();
        if(is_null($user->password_changed_at)){
            $user->password = bcrypt($request->password);
            $user->password_changed_at = now();
            $user->email_verified_at = now();
            $user->save();

            return response()->json([
                'success'=>true,
                'message' => 'Le mot de passe a été changé avec succès'
            ],Response::HTTP_OK);
        }
        return response()->json([
            'success'=>false,
            'message' => 'La mise à jour a déjà été faite'
        ],Response::HTTP_NOT_MODIFIED);
    }
}
