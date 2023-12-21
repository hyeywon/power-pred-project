package powerplant.powerpred.response;

import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class PowerData {

    private Timestamp dateTime;
    private Double amount;
}
