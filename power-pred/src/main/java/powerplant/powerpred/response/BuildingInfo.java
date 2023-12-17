package powerplant.powerpred.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class BuildingInfo {

    private String name;
    private List<PowerData> powerData;
    private Double elecBill;
}
