<?php

namespace App\Rules;

use App\Enums\PostStatus;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidPublishedAt implements ValidationRule
{
    protected ?int $status;

    public function __construct(?int $status)
    {
        $this->status = $status !== null ? (int) $status : null;
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $value = $value === '' ? null : $value;

        if ($this->status === PostStatus::Published->value && $value === null) {
            $fail('Published posts must have a publish time.');

            return;
        }

        if ($this->status !== PostStatus::Published->value && $value !== null) {
            $fail('Only published posts may have a publish time.');

            return;
        }

        if ($value !== null && strtotime($value) === false) {
            $fail('The publish time is not a valid date.');
        }
    }
}
