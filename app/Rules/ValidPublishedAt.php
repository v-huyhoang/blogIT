<?php

namespace App\Rules;

use App\Enums\PostStatus;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Carbon;

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
        // Treat empty strings or empty values as null
        if ($value === '' || $value === null) {
            $value = null;
        }

        // If status is Draft (0) or Pending (1), we don't care about the date
        if (in_array($this->status, [PostStatus::Draft->value, PostStatus::Pending->value])) {
            return;
        }

        // If status is Schedule, date is required and must be in future
        if ($this->status === PostStatus::Schedule->value) {
            if ($value === null) {
                $fail('Scheduled posts must have a scheduled time.');

                return;
            }

            try {
                // Try parsing with Carbon
                $date = Carbon::parse($value);

                if ($date->isPast() || $date->isNow()) {
                    $fail('Scheduled time must be in the future.');

                    return;
                }
            } catch (\Exception $e) {
                // Fallback: Try strtotime if Carbon fails
                $timestamp = strtotime($value);
                if ($timestamp === false) {
                    $fail('The scheduled time is not a valid date.');

                    return;
                }

                if ($timestamp <= time()) {
                    $fail('Scheduled time must be in the future.');

                    return;
                }
            }
        }

        // If status is Published, date is optional (for backdating)
        if ($this->status === PostStatus::Published->value) {
            if ($value !== null) {
                try {
                    Carbon::parse($value);
                } catch (\Exception $e) {
                    if (strtotime($value) === false) {
                        $fail('The publish time is not a valid date.');
                    }
                }
            }
        }
    }
}
