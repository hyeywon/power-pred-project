package powerplant.powerpred.building;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import powerplant.powerpred.power.PowerService;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/buildings")
public class BuildingController {

    private final BuildingService buildingService;
    private final PowerService powerService;

    @Autowired
    public BuildingController(BuildingService buildingService, PowerService powerService) {
        this.buildingService = buildingService;
        this.powerService = powerService;
    }

    @PostMapping("/upload")
    public ResponseEntity<Long> upload(@RequestPart String buildingName, @RequestPart MultipartFile csv) {
        Long buildingID = buildingService.upload(buildingName);
        log.info("BUILDING upload completed.");
        powerService.pastUpload(buildingID, csv);
        log.info("POWER upload completed.");

        return ResponseEntity.ok(buildingID);
    }

    @GetMapping("/{buildingId}/predicted-csv")
    public ResponseEntity<String> getPredictedCsvByBuildingId(@PathVariable Long buildingId) {
        // 예측된 CSV 파일 경로를 데이터베이스에서 가져오기
        Optional<String> predictedCsv = buildingService.getPredictedCsvByBuildingId(buildingId);

        return predictedCsv
                .map(ResponseEntity.ok()::body)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/all")
    public List<Building> getAllBuildings() {
        // 모든 csv 파일을 불러오기
        return buildingService.getAllBuildings();
    }

    @GetMapping("/csv/{userId}")
    public ResponseEntity<String> getCsvByUserId(@PathVariable String userId) {
        // 유저 아이디로 csv 파일 불러오기
        Optional<String> csvContent = buildingService.getCsvByUserId(userId);

        return csvContent
                .map(ResponseEntity.ok()::body)
                .orElse(ResponseEntity.notFound().build());
    }
}
