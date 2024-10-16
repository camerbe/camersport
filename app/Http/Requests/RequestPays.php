<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RequestPays extends FormRequest
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
            'pays'=>'required',
            'country'=>'required',
            'code'=>'required',
            'code3'=>'required',

        ];
    }
    public function messages()
    {
        return [
            'pays.required' => "Le pays est requis",
            'country.required' => "Le country est requis",
            'code.required' => 'Le code est requis',
            'code3.required' => 'Le code3 est requis',

        ];
    }
}
