<?php

namespace App\Form;

use App\Entity\Itinerary;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class ItineraryType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('departureDate', DateTimeType::class,  ['years' => range(2019, 2025), 'label' => 'Date de Départ : '])
            ->add('arrivalDate', DateTimeType::class,  ['years' => range(2019, 2025), 'label' => 'Date d\'Arrivée : '])
            ->add('countryName', TextType::class, ['label' => 'Pays : '])
            ->add('cityName', TextType::class, ['label' => 'Ville : '])
            ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Itinerary::class,
        ]);
    }
}
