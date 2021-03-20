<?php
namespace Mariojgt\Canvas;

use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;
use Mariojgt\Canvas\Commands\Publish;
use Mariojgt\Canvas\Commands\Republish;
use Mariojgt\Canvas\Events\UserVerifyEvent;
use Mariojgt\Canvas\Listeners\SendUserVerifyListener;

class CanvasProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        // Event for when you create a new user
        Event::listen(
            UserVerifyEvent::class,
            [SendUserVerifyListener::class, 'handle']
        );

        // Load some commands
        if ($this->app->runningInConsole()) {
            $this->commands([
                Republish::class,
            ]);
        }

        // Load canvas views
        $this->loadViewsFrom(__DIR__.'/views', 'canvas');
        // Load canvas routes
        $this->loadRoutesFrom(__DIR__.'/Routes/web.php');
        // Load Migrations
        $this->loadMigrationsFrom(__DIR__.'/database/migrations');
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->publish();
    }

    public function publish()
    {
        // Publish the npm case we need to do soem developent
        $this->publishes([
            __DIR__.'/../Publish/Npm/' => base_path()
        ]);

        // Publish the resource in case we need to compile
        $this->publishes([
            __DIR__.'/../Publish/Resource/' => resource_path('vendor/Canvas/')
        ]);

        // Publish the public folder
        $this->publishes([
            __DIR__.'/../Publish/Public/' => public_path('vendor/Canvas/')
        ]);

        // Publish the public folder
        $this->publishes([
            __DIR__.'/../Publish/Config/' => config_path('')
        ]);
    }
}
