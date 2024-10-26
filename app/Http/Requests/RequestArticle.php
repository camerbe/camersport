<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RequestArticle extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
            'titre'=>'required',
            'auteur'=>'required',
            'source'=>'required',
            'motclef'=>'required',
            'chapeau'=>'required',
            'article'=>'required',
            'date_parution'=>'required',
            'user_id'=>'required',
            'categorie_id'=>'required',
            'pays_code'=>'required',

        ];
    }
    public function messages()
    {
        return [
            'titre.required' => "Le titre est requis",
            'auteur.required' => "L'auteur' est requis",
            'source.required' => "La source est requise",
            'motclef.required' => "Le mot clef est requis",
            'chapeau.required' => "Le chapeau est requis",
            'article.required' => "L'article' est requis",
            'date_parution.required' => "La date de parution est requise",
            'user_id.required' => "Le user est requis",
            'categorie_id.required' => "La catégorie requise",
            'pays_code.required' => "Le pays requise",

        ];
    }
}
