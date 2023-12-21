package powerplant.powerpred.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class BuildingInfo {

    private String name;
    private List<PowerData> powerData;
    private Double elecBill;
}
