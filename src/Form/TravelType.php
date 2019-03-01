<?php

namespace App\Form;

use App\Entity\Travel;
use App\Transformers\DateTransformer;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class TravelType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', TextType::class, [
                'label' => 'Pays',
            ])
            ->add('startDate', TextType::class, [
                'label' => 'Date de départ',
                'attr' => [
                    'class' => 'js-datepicker form-control',
                    'autocomplete' => 'off',
                ],
            ])
            ->add('endDate', TextType::class, [
                'label' => 'Date de retour',
                'attr' => [
                    'class' => 'js-datepicker form-control',
                    'autocomplete' => 'off',
                ],
            ]);

        $builder->get('startDate')
            ->addModelTransformer(new DateTransformer());
            $builder->get('endDate')
            ->addModelTransformer(new DateTransformer());
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Travel::class,
        ]);
    }
}
