<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RequestLiveMatch extends FormRequest
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
            'team1'=>'required',
            'team2'=>'required',
        ];
    }
    public function messages()
    {
        return [
            'team1.required' => "L'équipe 1 est requise",
            'team2.required' => "L'équipe 2 est requise",

        ];
    }
}
