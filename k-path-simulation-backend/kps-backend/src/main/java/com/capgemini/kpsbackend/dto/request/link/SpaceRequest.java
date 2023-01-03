package com.capgemini.kpsbackend.dto.request.link;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SpaceRequest {
    private Integer spaceNumber;
    private Boolean isAvailable;
}
