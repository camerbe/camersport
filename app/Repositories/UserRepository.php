<?php

namespace App\Repositories;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\Registered;

class UserRepository extends BaseRepository
{

    public function __construct(User $user)
    {
        $this->model=$user;
    }

    public function findById($id)
    {
        return new UserResource(parent::findById($id)) ;
    }

    public function delete($id)
    {
        return parent::delete($id);
    }

    public function update(array $input, $id)
    {
        $currentUser=parent::findById($id);
        $input['nom']=isset($input['nom'])? Str::upper($input['nom']):$currentUser->nom;
        $input['prenom']=isset($input['prenom'])? Str::title($input['prenom']):$currentUser->prenom;
        $input['email']= $input['email'] ?? $currentUser->email;
        $input['role']= $input['role'] ?? $currentUser->role;
        return parent::update($input, $id);
    }

    public function create(array $input)
    {

        $input['nom']=Str::upper($input['nom']);
        $input['prenom']=Str::title($input['prenom']);
        $password=$input['password'] ?? '123456';
        $input['password']=bcrypt($password);
        $userCreated=parent::create($input);
        //$userCreated->sendApiEmailVerificationNotification();


        event(new Registered($userCreated));
        return new UserResource($userCreated);
    }

    public function findAll(){
       return UserResource::collection(
           User::orderBy('nom')
               ->orderBy('prenom')
               ->get()

       );
    }

    public  function changePassword(array $input, $id)
    {
        $currentUser=parent::findById($id);
        $currentUser->password_changed_at=now();
        $currentUser->password=bcrypt($input['password']);
        $currentUser->save();
        return new UserResource($currentUser);
    }



}
