<?php

declare(strict_types=1);

namespace Modules\Utilization\Admin\Resources;

use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Illuminate\Container\Container;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Textarea;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Modules\Utilization\Models\UtilizationType;
use Nwidart\Modules\Contracts\RepositoryInterface;

final class UtilizationTypeResource extends Resource
{
    protected static ?string $model = UtilizationType::class;

    protected static ?string $navigationGroup = 'Penggunaan Dana';

    protected static ?string $navigationIcon = 'heroicon-o-archive-box';

    protected static ?string $label = 'Jenis Penggunaan';

    protected static ?string $pluralLabel = 'Jenis Penggunaan';

    protected static ?string $navigationLabel = 'Jenis Penggunaan';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Section::make()->schema([
                TextInput::make('name')
                    ->label('Jenis Penggunaan')
                    ->required(),
                Textarea::make('description')
                    ->label('Deskripsi')
                    ->nullable()
                    ->extraAttributes([
                        'class' => 'resize-none',
                    ]),
                Toggle::make('is_distribution')
                    ->label('Tandai penggunaan dana sebagai penyaluran program')
                    ->default(false),
                Toggle::make('is_active')
                    ->label('Aktifkan jenis penggunaan')
                    ->default(true),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            TextColumn::make('name')
                ->label('Jenis Penggunaan')
                ->searchable()
                ->sortable(),
            IconColumn::make('is_distribution')
                ->label('Penyaluran')
                ->boolean(),
            IconColumn::make('is_active')
                ->label('Aktif')
                ->boolean(),
        ])->actions([
            EditAction::make(),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => UtilizationTypeResource\Pages\ListUtilizationTypes::route('/'),
            'create' => UtilizationTypeResource\Pages\CreateUtilizationType::route('/create'),
            'edit' => UtilizationTypeResource\Pages\EditUtilizationType::route('/{record}/edit'),
        ];
    }

    public static function canViewAny(): bool
    {
        return self::shouldRegisterNavigation() && parent::canViewAny();
    }

    public static function shouldRegisterNavigation(): bool
    {
        /** @var RepositoryInterface $repository */
        $repository = Container::getInstance()->get(RepositoryInterface::class);

        return \rescue(static fn () => $repository->isEnabled('Utilization'), false);
    }
}
