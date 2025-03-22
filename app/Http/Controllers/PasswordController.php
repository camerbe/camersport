<?php

namespace App\Http\Controllers;

use App\Mail\ResetPasswordMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;


class PasswordController extends Controller
{
    //
    public function forgot(Request $request){
        $email=$request->input('email');
        $token=Str::random(24);
        DB::table('password_reset_tokens')->insert([
            'email'=>$email,
            'token'=>$token,
            'created_at'=>now()
        ]);
        Mail::to($email)->send(new ResetPasswordMail($token));

        return response()->json([
            "message"=>"vérifie ton email"
        ],Response::HTTP_OK);
    }
    public function reset(Request $request){
        $passwordRequest=DB::table('password_reset_tokens')
            ->where('token',$request->input('token'))->first();
        //dd($passwordRequest);
        if(!$user=User::where('email',$passwordRequest->email)->first()){
            throw new NotFoundHttpException("User inexistant");
        }
        $user->password=bcrypt($request->input('password'));
        $user->save();
        DB::table('password_reset_tokens')
            ->where('token',$request->input('token'))
            ->delete();
        return response()->json([
            "message"=>"Réinitialisation réussie"
        ],Response::HTTP_OK);
    }
}
