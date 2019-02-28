<?php

namespace App\Form;

use App\Entity\Expense;
use App\Entity\Traveler;
use App\Entity\Travel;
use Doctrine\ORM\EntityRepository;
use App\Transformers\DateTimeTransformer;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\CallbackTransformer;

class ExpenseType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $travel = new Travel();
        
        $builder
            ->add('date', DateType::class, [ // J'ai laisser en DateTime pour que le traitement fonctionne
                                            // Si TexteType, décommenter widget et html5
                'widget' => 'single_text',
                'html5' => false,
                // 'attr' => ['class' => 'js-datepicker'], // A recommenter, datepicker bug
            ])
            ->add('description')
            ->add('amount')
            ->add('refundersList', EntityType::class, [
                'class' => Traveler::class,
                'choice_label' => 'username',
                // 'choices' => $travel->getTravelers(),
                'multiple' => true
            ]);
            
        // $builder->get('date')
        //     ->addModelTransformer(new DateTimeTransformer());
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Expense::class,
        ]);
    }
}
