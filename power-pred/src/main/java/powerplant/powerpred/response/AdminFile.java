package powerplant.powerpred.response;

import java.sql.Blob;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class AdminFile {

    List<Blob> trainData;
    List<String> predictions;
}
