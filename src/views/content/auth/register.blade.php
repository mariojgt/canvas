<x-canvas::layout.login>
    <x-canvas::auth.authconteiner title="Register" >
        <x-slot name="form">
            <x-canvas::form.form action="{{ route('register.user') }}" >
                <div class="px-5 py-7">
                    <x-canvas::form.text name="name" label="Name" />
                    <x-canvas::form.email name="email" label="Email" />
                    <x-canvas::form.password name="password" label="Password" />
                    <x-canvas::form.password name="password_confirmation" label="Password Confirm" />
                    <x-canvas::form.submit name="Register" />
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

