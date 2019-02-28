<?php

namespace App\Form;

use App\Entity\Travel;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class TravelType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name')
            ->add('startDate', DateType::class, [ // J'ai laisser en DateTime pour que le traitement fonctionne
                // Si TexteType, décommenter widget et html5
                'widget' => 'single_text',
                'html5' => false,
                'attr' => [
                    'class' => 'js-datepicker form-control',
                    'autocomplete' => 'off',
                    'default'
                ],
            ])
            ->add('endDate', DateType::class, [ // J'ai laisser en DateTime pour que le traitement fonctionne
                // Si TexteType, décommenter widget et html5
                'widget' => 'single_text',
                'html5' => false,
                'attr' => [
                    'class' => 'js-datepicker form-control',
                    'autocomplete' => 'off',
                    'default'
                ],
            ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Travel::class,
        ]);
    }
}
