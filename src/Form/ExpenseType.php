<?php

namespace App\Form;

use App\Entity\Expense;
use App\Entity\Traveler;
use App\Transformers\DateTransformer;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\DataTransformer\DateTimeToStringTransformer;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ExpenseType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        
        $builder
            ->add('date', TextType::class, [
                'label' => 'Date',
                'attr' => [
                    'class' => 'js-datepicker',
                    'autocomplete' => 'off',
                    ],
            ])
            ->add('description')
            ->add('amount')
            ->add('refundersList', EntityType::class, [
                'class' => Traveler::class,
                'choice_label' => 'username',
                // 'choices' => $travel->getTravelers(),
                'multiple' => true
            ]);

        $builder->get('date')
            ->addModelTransformer(new DateTransformer());

    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Expense::class,
        ]);
    }
}
