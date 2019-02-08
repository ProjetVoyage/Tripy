<?php

namespace App\Services;

class Mailer
{
    /**
     * @var \Swift_Mailer
     */
    private $mailer;

    /**
     * Mailer constructor.
     * @param \Swift_Mailer $mailer
     */
    public function __construct(\Swift_Mailer $mailer)
    {
        $this->mailer = $mailer;
    }

    /**
     * @param string $subject
     * @param $recever
     * @param $body
     */
    public function buildAndSendMail(string $subject, $recever, $body): void
    {
        $message = (new \Swift_Message($subject))
            ->setFrom('no-reply@tripyprojectesgi.com')
            ->setTo($recever)
            ->setBody($body, 'text/html');

        $this->send($message);
    }

    /**
     * @param $message
     */
    public function send($message): void
    {
        $this->mailer->send($message);
    }

}