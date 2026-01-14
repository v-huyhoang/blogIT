<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\Filterable;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
	use Filterable;

	protected array $searchable = [
		'name',
		'email',
	];
	/**
	 * Display a listing of the resource.
	 */
	public function index(Request $request)
	{
		$users = User::query()
			->search($request->q)
			->filter($request->only(['status']))
			->latest()
			->paginate(10)
			->withQueryString()
			->through(fn($user) => [
				'id' => $user->id,
				'name' => $user->name,
				'email' => $user->email,
				'roles' => $user->getRoleNames(),
				'created_at' => $user->created_at->format('d-m-Y'),
				'updated_at' => $user->updated_at->format('d-m-Y'),
			]);

		return Inertia::render('users/index', [
			'users' => $users,
			'filters' => $request->only(['q', 'status']),
		]);
	}

	/**
	 * Show the form for creating a new resource.
	 */
	public function create()
	{
		return Inertia::render('users/create', [
			'roles' => Role::all()->pluck('name')
		]);
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(Request $request)
	{
		$request->validate([
			'name' => 'required|string|max:255',
			'email' => 'required|string|email|max:255|unique:users,email',
			'password' => 'required|string|min:8',
			'roles' => 'nullable|array',
			'roles.*' => 'string|exists:roles,name',
		]);

		$user = User::create([
			'name' => $request->name,
			'email' => $request->email,
			'password' => bcrypt($request->password),
		]);

		if ($request->has('roles')) {
			$user->syncRoles($request->roles);
		}
		return to_route('users.index')->with('message', 'User created successfully.');
	}

	/**
	 * Display the specified resource.
	 */
	public function show(string $id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(User $user)
	{
		return Inertia::render('users/edit', [
			'user' => $user->load('roles'),
			'roles' => Role::all()->pluck('name')
		]);
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Request $request, User $user)
	{
		$request->validate([
			'name' => 'required|string|max:255',
			'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
			'roles' => 'nullable|array',
			'roles.*' => 'string|exists:roles,name',
		]);

		$user->update([
			'name' => $request->name,
			'email' => $request->email,
		]);

		if ($request->has('roles')) {
			$user->syncRoles($request->roles);
		}
		return to_route('users.index')->with('message', 'User updated successfully.');
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(User $user)
	{
		$user->delete();
		return to_route('users.index')->with('message', 'User deleted successfully.');
	}
}
