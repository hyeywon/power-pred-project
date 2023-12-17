package powerplant.powerpred.building;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import powerplant.powerpred.power.PowerService;
import powerplant.powerpred.response.AdminFile;
import powerplant.powerpred.response.BuildingInfo;

@RestController
@RequiredArgsConstructor
@Slf4j
public class BuildingController {

    private final BuildingService buildingService;
    private final PowerService powerService;

    @PostMapping("/upload")
    public ResponseEntity<Long> upload(@RequestPart String buildingName, @RequestPart MultipartFile csv) {
        Long buildingID = buildingService.upload(buildingName, csv);
        log.info("BUILDING upload completed.");
        powerService.upload(buildingID, csv);
        log.info("POWER upload completed.");

        return ResponseEntity.ok(buildingID);
    }

    @GetMapping("/view/admin")
    public ResponseEntity<AdminFile> adminView() {
        return ResponseEntity.ok(buildingService.adminView());
    }

    @GetMapping("/view/user")
    public ResponseEntity<List<BuildingInfo>> userView() {
        return ResponseEntity.ok(buildingService.userView());
    }
}
