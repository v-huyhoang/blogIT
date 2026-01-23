<?php

namespace App\DTOs;

use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use ReflectionClass;

abstract class BaseDTO
{
    public static function fromArray(array $data): static
    {
        $reflection = new ReflectionClass(static::class);
        $params = $reflection->getConstructor()->getParameters();

        $args = [];

        foreach ($params as $p) {
            $name = $p->getName(); // perPage
            $snake = Str::snake($name); // per_page

            if (array_key_exists($name, $data) && ($data[$name] !== null || $p->allowsNull())) {
                $value = $data[$name];
            } elseif (array_key_exists($snake, $data) && ($data[$snake] !== null || $p->allowsNull())) {
                $value = $data[$snake];
            } elseif ($p->isDefaultValueAvailable()) {
                $value = $p->getDefaultValue();
            } else {
                $value = null;
            }

            $args[] = $value;
        }

        return $reflection->newInstanceArgs($args);
    }

    public function toArray(array $except = []): array
    {
        return Arr::except(get_object_vars($this), $except);
    }

    public function toSnakeArray(): array
    {
        return collect($this->toArray())
            ->mapWithKeys(fn ($value, $key) => [Str::snake($key) => $value])
            ->all();
    }
}
