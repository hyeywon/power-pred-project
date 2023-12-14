package powerplant.powerpred.building;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import powerplant.powerpred.power.PowerService;

@RestController
@RequiredArgsConstructor
@Slf4j
public class BuildingController {

    private final BuildingService buildingService;
    private final PowerService powerService;

    @PostMapping("/upload")
    public ResponseEntity<Long> upload(@RequestPart String buildingName, @RequestPart MultipartFile csv) {
        Long buildingID = buildingService.upload(buildingName);
        log.info("BUILDING upload completed.");
        powerService.pastUpload(buildingID, csv);
        log.info("POWER upload completed.");

        return ResponseEntity.ok(buildingID);
    }
}
