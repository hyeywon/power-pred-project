package powerplant.powerpred.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.core.io.ByteArrayResource;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class AdminFile {

    List<String> trainData;
    List<String> predictions;
}
