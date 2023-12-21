package powerplant.powerpred.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class UploadValue {

    private String buildingName;
    private String id;
    private Boolean isAdmin;
}
