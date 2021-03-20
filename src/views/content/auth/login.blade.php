<x-canvas::layout.login>
    <x-canvas::auth.authconteiner
    title="Login"
    image="/vendor/Canvas/image/canvas.png"
    >
        <x-slot name="form">
            <x-canvas::form.form action="{{ route('login.user') }}" >
                <div class="px-5 py-7">
                    <x-canvas::form.email name="email" label="Email" />
                    <x-canvas::form.password name="password" label="Password" />
                    <x-canvas::form.submit />
                </div>
            </x-canvas::form.form>
        </x-slot>

        <x-slot name="links">
            <div class="grid grid-cols-2 gap-1">
                <div class="text-center sm:text-center whitespace-nowrap">
                    <x-canvas::form.link route="{{ route('forgot-password') }}" name="Forgot Password" />
                </div>
                <div class="text-center sm:text-center whitespace-nowrap" >
                    <x-canvas::form.link route="{{ route('register') }}" name="Register" />
                </div>
                <div class="text-center sm:text-center whitespace-nowrap" >
                    <x-canvas::form.dark_light />
                </div>
            </div>
        </x-slot>
    </x-canvas::auth.authconteiner>

</x-canvas::layout.login>
