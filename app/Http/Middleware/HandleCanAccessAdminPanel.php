<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class HandleCanAccessAdminPanel
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->user()) {
            return to_route('login');
        }

        if ($request->user()->hasRole('Super Admin')) {
            return $next($request);
        }

        $allowedRoles = ['Admin'];

        if ($request->user()->hasAnyRole($allowedRoles)) {
            return $next($request);
        }

        if ($request->user()->hasAnyRole(['Author', 'Subscriber'])) {
            return to_route('home');
        }

        abort(403, 'Do not have permission to access this page.');
    }
}
