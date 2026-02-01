<?php

namespace App\Notifications\Post;

use App\Models\Post;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\HtmlString;

class PostBatchPublishedForAdminNotification extends Notification implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * Create a new notification instance.
     */
    public function __construct(public readonly array $postIds) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $posts = Post::with('user')
            ->whereIn('id', $this->postIds)
            ->get();

        $message = (new MailMessage)
            ->subject('🚀 Notification from admin BlogIT: '.$posts->count().' New Posts Published')
            ->greeting('Hello '.$notifiable->name.'!'."\n\n")
            ->line('The following posts have just been published:');

        $listHtml = '<ul style="padding-left: 0; list-style: none;">';

        foreach ($posts as $post) {
            $url = url('/posts/'.$post->slug);
            $author = $post->user->name ?? 'Unknown';
            $listHtml .= "
	            <li style='margin-bottom: 15px; padding: 10px; border-left: 4px solid #3869d4; background: #f8fafc;'>
	                <div style='font-weight: bold; font-size: 16px;'>
	                    <a href='{$url}' style='color: #2d3748; text-decoration: none;'>{$post->title}</a>
	                </div>
	                <div style='font-size: 14px; color: #64748b;'>
	                    Author: <strong>{$author}</strong> | Published at: {$post->published_at->format('H:i')}
	                </div>
	            </li>";
        }
        $listHtml .= '</ul>';

        return $message
            ->line(new HtmlString($listHtml))
            ->action('View All Posts', url('/admin/posts'))
            ->line('Keep up the great work!');
    }
}
