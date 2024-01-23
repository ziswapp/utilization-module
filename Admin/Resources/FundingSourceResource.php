<?php

declare(strict_types=1);

namespace Modules\Utilization\Admin\Resources;

use Livewire\Component;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Forms\Components\Card;
use Illuminate\Container\Container;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Illuminate\Database\Eloquent\Builder;
use Modules\Utilization\Models\FundingSource;
use Nwidart\Modules\Contracts\RepositoryInterface;

final class FundingSourceResource extends Resource
{
    protected static ?int $navigationSort = 3;

    protected static ?string $slug = 'funding-source';

    protected static ?string $model = FundingSource::class;

    protected static ?string $navigationGroup = 'Penggunaan Dana';

    protected static ?string $navigationIcon = 'heroicon-o-archive-box';

    protected static ?string $label = 'Sumber dana';

    protected static ?string $pluralLabel = 'Sumber dana';

    protected static ?string $navigationLabel = 'Sumber dana';

    public function mount(): void
    {
        \abort(401);
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Card::make()->schema([
                Select::make('funding_category_id')
                    ->relationship('category', 'name', function (Builder $query, Component $livewire): Builder {
                        return $livewire instanceof FundingSourceResource\Pages\EditFundingSource ? $query : $query->where('is_active', true);
                    })->label('Kategori')->required(),
                TextInput::make('name')->label('Sumber dana')->required(),
                Toggle::make('is_active')->label('Sumber dana aktif')->default(true),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            TextColumn::make('category.name')
                ->label('Kategori')
                ->sortable(),
            TextColumn::make('name')
                ->label('Nama')
                ->searchable()
                ->sortable(),
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
            'index' => FundingSourceResource\Pages\ListFundingSources::route('/'),
            'create' => FundingSourceResource\Pages\CreateFundingSource::route('/create'),
            'edit' => FundingSourceResource\Pages\EditFundingSource::route('/{record}/edit'),
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
