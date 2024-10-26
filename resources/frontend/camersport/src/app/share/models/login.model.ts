export interface Login {
  "success":boolean,
  "user":UserLogin,
  "token":string,
  "expires_at":Date,
  "message":string
}

export interface UserLogin {
  "id":number,
  "nom" :string,
  "prenom":string,
  "email":string,
  "email_verified_at":Date,
  "password_changed_at":Date,
  "role":string,
  "created_at":Date,
  "updated_at":Date

}
