import { DomainObject } from 'domain-objects';
import Joi from 'joi';

const schema = Joi.object().keys({
  trace: Joi.array()
    .items(Joi.string())
    .required(),
  pick: Joi.array()
    .items(Joi.string())
    .required(),
});

export interface ArtifactConfig {
  trace: string[];
  pick: string[];
}

export class ArtifactConfig extends DomainObject<ArtifactConfig> implements ArtifactConfig {
  public static schema = schema;
}
