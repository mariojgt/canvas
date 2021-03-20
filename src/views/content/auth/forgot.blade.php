<x-canvas::layout.login>
    <x-canvas::auth.authconteiner title="Password Reset" >
        <x-slot name="form">
            <x-canvas::form.form action="{{ route('password-reset') }}" >
                <div class="px-5 py-7">
                    <x-canvas::form.email name="email" label="Email" />
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
