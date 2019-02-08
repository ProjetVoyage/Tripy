<?php

namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Symfony\Component\Validator\Exception\UnexpectedValueException;

class HasEnoughCharactersValidator extends ConstraintValidator
{
    public function validate($value, Constraint $constraint)
    {
        if (!$constraint instanceof HasEnoughCharacters) {
            throw new UnexpectedTypeException($constraint, HasEnoughCharacters::class);
        }

        if (null === $value || '' === $value) {
            return;
        }

        if (strlen($value) < 6) {
            $this->context->buildViolation($constraint->message)
                ->setParameter('{{ number }}', 6)
                ->addViolation();
        }
    }
}