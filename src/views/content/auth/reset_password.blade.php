<x-canvas::layout.login>
    <x-canvas::auth.authconteiner title="Password Change Reset" >
        <x-slot name="form">
            <x-canvas::form.form action="{{ route('password.change') }}" >
                <div class="px-5 py-7">
                    <input type="hidden" name="token" value="{{ $token }}" >
                    <x-canvas::form.email name="email" label="Email" value="{{ Request('email') }}" />
                    <x-canvas::form.password name="password" label="Password" />
                    <x-canvas::form.password name="password_confirmation" label="Password Confirm" />
                    <x-canvas::form.submit name="Reset" />
                </div>
            </x-canvas::form.form>
        </x-slot>

        <x-slot name="links">
            <div class="px-5 py-7">
                <div class="grid grid-cols-1 gap-3">
                    <x-canvas::form.link route="{{ route('login') }}" name="Login" />
                </div>
            </div>
        </x-slot>
    </x-canvas::auth.authconteiner>
</x-canvas::layout.login>
