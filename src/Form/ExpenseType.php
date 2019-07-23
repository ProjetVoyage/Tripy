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
use Symfony\Component\Validator\Constraints\Choice;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

class ExpenseType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $refundsList = $this->rebuildOptionsList($options['refundersList']);

        $builder
            ->add('date', TextType::class, [
                'label' => 'Date',
                'attr' => [
                    'class' => 'js-datepicker',
                    'autocomplete' => 'off',
                ],
            ])
            ->add('description')
            ->add('amount', TextType::class,[
                'label' => 'Montant'
            ])
            ->add('refundersList', ChoiceType::class, [
                'choices' => $refundsList,
                'multiple' => true,
                'expanded' => true,
                'label' => 'Liste des voyageurs'
            ]);
            
        $builder->get('date')
            ->addModelTransformer(new DateTransformer());
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Expense::class,
            'refundersList' => null
        ]);
    }

    public function rebuildOptionsList($options)
    {
        $tab = [];
        foreach ($options as $key => $value) {
            $tab[$value['username']] = $value['id'];
        }
        return $tab;
    }
}
