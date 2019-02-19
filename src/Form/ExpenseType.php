<?php

namespace App\Form;

use App\Entity\Expense;
use App\Entity\Traveler;
use App\Transformers\DateTimeTransformer;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ExpenseType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('date', DateType::class, [
                'widget' => 'single_text',
                'html5' => false,
                'attr' => ['class' => 'js-datepicker'],
            ])
            ->add('description')
            ->add('amount')
            ->add('traveler', EntityType::class, [
                'class' => Traveler::class,
                'choice_label' => 'username'
            ]);

        $builder->get('date')
            ->addModelTransformer(new DateTimeTransformer());
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Expense::class,
        ]);
    }
}
