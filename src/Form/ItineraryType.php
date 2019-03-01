<?php

namespace App\Form;

use App\Entity\Itinerary;
use App\Transformers\DateTransformer;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ItineraryType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('departureDate', TextType::class,
                [
                    'label' => 'Date de départ',
                    'attr' => [
                        'class' => 'js-datepicker form-control',
                        'autocomplete' => 'off',
                    ]
                    ,])
            ->add('arrivalDate', TextType::class,  [
                'label' => 'Date d\'arrivé',
                'attr' => [
                    'class' => 'js-datepicker form-control',
                    'autocomplete' => 'off',
                ],])
            ->add('countryName', TextType::class, ['label' => 'Pays : ' ,  'attr' => [
                'class' => 'form-control',
            ],])
            ->add('cityName', TextType::class, ['label' => 'Ville : ', 'attr' => [
                'class' => 'form-control',
            ],])
        ;

        $builder->get('departureDate')
            ->addModelTransformer(new DateTransformer());
        $builder->get('arrivalDate')
            ->addModelTransformer(new DateTransformer());

    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Itinerary::class,
        ]);
    }
}
