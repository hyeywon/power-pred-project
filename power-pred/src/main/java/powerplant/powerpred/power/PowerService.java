package powerplant.powerpred.power;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.Timestamp;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class PowerService {

    private final PowerRepository powerRepository;

    /**
     * 데이터 업로드 :: 전력량 데이터 저장
     */
    public void upload(Long buildingID, MultipartFile csv) {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(csv.getInputStream()))) {
            String line = reader.readLine();
            while ((line = reader.readLine()) != null) {
                String[] data = line.split(",");
                Power power = new Power(
                        buildingID,
                        Timestamp.valueOf(data[0]),
                        Double.parseDouble(data[1])
                );
                powerRepository.save(power);
            }
        } catch (IOException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }
}
