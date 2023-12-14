package powerplant.powerpred.power;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@IdClass(PowerPK.class)
public class Power {

    @Id
    private Long buildingID;
    @Id
    private Timestamp dateTime;
    private Double power;
}
