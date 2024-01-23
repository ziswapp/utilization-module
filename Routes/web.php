<?php

declare(strict_types=1);

use Illuminate\Routing\Router;
use Modules\Utilization\Http\Controllers;

return static function (Router $router): void {
    $router->middleware('auth')->prefix('/utilization')->group(static function (Router $router): void {
        $router->get('/dashboard', [Controllers\DashboardController::class, 'show']);
        $router->get('/export', [Controllers\DownloadController::class, 'create']);
        $router->post('/export', [Controllers\DownloadController::class, 'store']);

        $router->get('/beneficiary', [Controllers\BeneficiaryController::class, 'index']);
        $router->get('/beneficiary/{beneficiary}/edit', [Controllers\BeneficiaryController::class, 'edit']);
        $router->get('/beneficiary/{beneficiary}', [Controllers\BeneficiaryController::class, 'show'])
            ->name('utilization.beneficiary.show');
        $router->put('/beneficiary/{beneficiary}', [Controllers\BeneficiaryController::class, 'update']);

        $router->get('/', [Controllers\UtilizationController::class, 'index']);
        $router->get('/new', [Controllers\UtilizationController::class, 'create']);
        $router->get('/{utilization}', [Controllers\UtilizationController::class, 'show'])->name('utilization.show');
        $router->get('/{utilization}/edit', [Controllers\UtilizationController::class, 'edit']);

        $router->get('/{utilization}/beneficiary/new', [Controllers\BeneficiaryUtilizationController::class, 'create'])
            ->name('utilization.beneficiary.new');
        $router->get('/{utilization}/beneficiary/edit', [Controllers\BeneficiaryUtilizationController::class, 'edit']);
        $router->post('/{utilization}/beneficiary', [Controllers\BeneficiaryUtilizationController::class, 'store']);
        $router->post('/{utilization}/beneficiary/attach', [Controllers\AttachBeneficiaryController::class, 'store']);
        $router->post('/{utilization}/beneficiary/detach', [Controllers\AttachBeneficiaryController::class, 'delete']);

        $router->get('/{utilization}/item/new', [Controllers\ItemController::class, 'create'])
            ->name('utilization.item.new');
        $router->get('/{utilization}/item/edit', [Controllers\ItemController::class, 'edit'])
            ->name('utilization.item.edit');
        $router->post('/{utilization}/item', [Controllers\ItemController::class, 'store']);

        $router->get('/{utilization}/attachment/new', [Controllers\AttachmentController::class, 'create'])
            ->name('utilization.attachment.new');

        $router->get('/{utilization}/attachment/edit', [Controllers\AttachmentController::class, 'edit'])
            ->name('utilization.attachment.edit');

        $router->get('/{utilization}/send', [Controllers\SendController::class, 'create']);
        $router->post('/{utilization}/send', [Controllers\SendController::class, 'store']);

        $router->post('/{utilization}/attachment', [Controllers\AttachmentController::class, 'store']);
        $router->delete('/{utilization}/attachment/{file}', [Controllers\AttachmentController::class, 'destroy']);

        $router->post('/', [Controllers\UtilizationController::class, 'store']);
        $router->patch('/{utilization}/cancel', [Controllers\CancelController::class, 'store']);
        $router->patch('/{utilization}/send', [Controllers\SendController::class, 'create']);
        $router->patch('/{utilization}', [Controllers\UtilizationController::class, 'update']);

        $router->delete('/item/{item}', [Controllers\ItemController::class, 'delete']);
    });
};
