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
        /*
        $date = \DateTime::createFromFormat('Y/d/m', '2017/01/01');
        print_r($date);
        die();

        $maStr = $datetime->format('d/m/Y'); // date début est le nom de mon input
        $zedate = \DateTime::createFromFormat('d/m/Y', $maStr);
return $zedate;
        print_r($maStr);
        print_r($zedate);
        die();
        $datetime = new \DateTime();
        $pp = $datetime->format('d/m/Y');

        print_r($pp);
        print_r($datetime);
        
        $date = new \DateTime();
        $d  = $date->createFromFormat('Y-m-d', $datetime);
        echo $d->format('Y-m-d');
die();
        // print_r($datetime);die();*/
        return $datetime->format('d/m/Y H:i');
        
        // return $datetime;
    }

    public function reverseTransform($stringDate)
    {
        if (null === $stringDate) {
            return NULL;
        }
        
        if (!is_string($stringDate)) {
            throw new TransformationFailedException('Expected a string.');
        }

        $date = new \DateTime();
        // print_r($date->createFromFormat('d/m/Y', $stringDate)); Pour une raison que j'ignore il ne reconnait pas la date envoyé
        // print_r($date->createFromFormat('d/m/Y', '15/02/2019'));
        // print_r($date->createFromFormat('d/m/Y', '10/02/2019'));die();
        
        return \DateTime::createFromFormat('d/m/Y', $stringDate);
    }
}