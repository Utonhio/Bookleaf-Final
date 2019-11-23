import { NgModule } from '@angular/core';
import { FiltroPipe } from './filtro/filtro';
@NgModule({
	declarations: [FiltroPipe
    ],
	exports: [FiltroPipe
    ]
})
export class PipesModule {}
