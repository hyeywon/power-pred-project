package powerplant.powerpred.power;

import java.io.Serializable;
import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class PowerPK implements Serializable {

    private Long buildingID;
    private Timestamp dateTime;
}
