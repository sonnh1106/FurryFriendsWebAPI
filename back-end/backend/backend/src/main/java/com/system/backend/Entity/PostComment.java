package com.system.backend.Entity;

import javax.persistence.*;

@Entity
@Table(name = "[post_comment]")
public class PostComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "[comment_id]", nullable = false)
    private Integer commentID;

    @ManyToOne
    @JoinColumn(name = "[post_id]", nullable = false, referencedColumnName = "[post_id]")
    private PostDetail postDetail;

    @ManyToOne
    @JoinColumn(name = "[user_id]", nullable = false, referencedColumnName = "[user_id]")
    private User user;

    @Column(name = "[comment]")
    private String comment;

    @Column(name = "[publish_date_comment]")
    private String publishDateComment;

    // getters and setters
}
