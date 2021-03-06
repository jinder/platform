import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { EffectSources } from './effect_sources';
import { Actions } from './actions';
import { ROOT_EFFECTS, FEATURE_EFFECTS, CONSOLE } from './tokens';
import { EffectsFeatureModule } from './effects_feature_module';
import { EffectsRootModule } from './effects_root_module';
import { EffectsRunner } from './effects_runner';
import { ErrorReporter } from './error_reporter';

@NgModule({})
export class EffectsModule {
  static forFeature(featureEffects: Type<any>[]): ModuleWithProviders {
    return {
      ngModule: EffectsFeatureModule,
      providers: [
        featureEffects,
        {
          provide: FEATURE_EFFECTS,
          multi: true,
          deps: featureEffects,
          useFactory: createSourceInstances,
        },
      ],
    };
  }

  static forRoot(rootEffects: Type<any>[]): ModuleWithProviders {
    return {
      ngModule: EffectsRootModule,
      providers: [
        EffectsRunner,
        EffectSources,
        ErrorReporter,
        Actions,
        rootEffects,
        {
          provide: ROOT_EFFECTS,
          deps: rootEffects,
          useFactory: createSourceInstances,
        },
        {
          provide: CONSOLE,
          useValue: console,
        },
      ],
    };
  }
}

export function createSourceInstances(...instances: any[]) {
  return instances;
}
