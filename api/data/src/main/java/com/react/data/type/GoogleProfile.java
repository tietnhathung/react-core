package com.react.data.type;

import lombok.Data;

@Data
public class GoogleProfile {
    private String sub;
    private String name;
    private String given_name;
    private String family_name;
    private String picture;
    private String email;
    private Boolean email_verified;
    private String locale;
}
