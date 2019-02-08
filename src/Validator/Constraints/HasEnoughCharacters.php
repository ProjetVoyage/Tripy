<?php

namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class HasEnoughCharacters extends Constraint
{
    public $message = 'The username must contain at least {{ number }} characters';

    public function validatedBy()
    {
        return \get_class($this).'Validator';
    }
}