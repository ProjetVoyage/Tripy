<?php
/**
 * Created by PhpStorm.
 * User: fattar
 * Date: 2019-02-08
 * Time: 05:53
 */

namespace App\Services\User\Manager;

use App\Entity\Traveler;
use App\Repository\TravelerRepository;
use App\Services\Mailer;
use Twig\Environment;

class UserManager
{

    /**
     * @var TravelerRepository
     */
    private $repository;

    /**
     * @var Mailer
     */
    private $mailer;

    /**
     * @var  Environment
     */
    private $templating;

    public function __construct(
        TravelerRepository $repository,
        Mailer $mailer,
        Environment $templating
    )
    {
        $this->repository = $repository;
        $this->mailer = $mailer;
        $this->templating = $templating;
    }

    /**
     * @param Traveler $traveler
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function sendWelcomeEmail(Traveler $traveler)
    {
        $this->mailer->buildAndSendMail(
            'Bienvenue à bord de Tripy !',
            $traveler->getEmail(),
            $this
                ->templating
                ->render('email/welcome.html.twig', [
                    'username' => $traveler->getUsername()
                ])
        );
    }
}