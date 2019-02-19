<?php

namespace App\Transformers;

use Symfony\Component\Form\DataTransformerInterface;
use Symfony\Component\Form\Exception\TransformationFailedException;

class DateTimeTransformer implements DataTransformerInterface
{
    public function transform($datetime)
    {
        if (null === $datetime) {
            return '';
        }

        if (!is_object($datetime)) {
            throw new TransformationFailedException('Expected a datetime.');
        }

        return $datetime->format('d/m/Y H:i');
    }

    public function reverseTransform($stringDate)
    {
        if (null === $stringDate) {
            return NULL;
        }

        if (!is_string($stringDate)) {
            throw new TransformationFailedException('Expected a string.');
        }

        return \DateTime::createFromFormat('d/m/Y', $stringDate);
    }
}