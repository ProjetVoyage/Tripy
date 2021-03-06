<?php

namespace App\Transformers;

use Symfony\Component\Form\DataTransformerInterface;
use Symfony\Component\Form\Exception\TransformationFailedException;
use Symfony\Component\Validator\Constraints\Date;

class DateTransformer implements DataTransformerInterface
{
    public function transform($date)
    {
        if (null === $date) {
            return '';
        }

        if (!$date instanceof Date) {
            throw new TransformationFailedException('Expected a date.');
        }

        return $date->format('d/m/Y H:i');
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