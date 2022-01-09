<script>
	let vehicleInfo = [];
	let vinSearch = "";
	let modelYear = ""

	async function lookupVin(e) {
		try{
			const returnedData = await fetch(`/vindecode?vin=${vinSearch}&modelYear=${modelYear}`)
			const response = await returnedData.json();
			vehicleInfo = response.data.Results;
		}

		catch(error){
			console.error(error);
		}
	}

</script>

<main>

	<div class="container">

		<div class="my-5 row text-center">
			<div class="col-md-12">
				<h1>VIN Decoder</h1>
				<p class="lead">This tool was built using the <a href="https://vpic.nhtsa.dot.gov/api/" target="_blank">NHTSA API</a></p>
			</div>
		</div>

		<div class="my-5 row">
			<div class="col-md-12 text-center">
				
				<h2>Vin Lookup</h2>
				<div class="form-floating mb-3">
					<input type="text" class="form-control" placeholder="Enter a VIN#" id="floatingVinInput" bind:value={vinSearch} />
					<label for="floatingnVinInput">Enter a VIN#</label>
				</div>
				<div class="form-floating mb-3">

					<input type="text" class="form-control" placeholder="Enter Your Model Year" id="floatingYearInput" bind:value={modelYear} />
					<label for="floatingYearInput">Enter Your Model Year</label>
				</div>
				<br>
				<button type ="button" class="btn btn-lg btn-primary mb-3" on:click={lookupVin}>Decode Vin</button>

				<div class="vin-table text-center">

					{#if vehicleInfo.length > 0 }
					<table class="table table-bordered table-striped">

					<tbody class="mt-3">
						<tr>
							<td class="fw-bold">Make</td>
							<td>{vehicleInfo[6].Value}</td>
						</tr>
						<tr>
							<td class="fw-bold">Model</td>
							<td>{vehicleInfo[8].Value}</td>
						</tr>
						<tr>
							<td class="fw-bold">Engine Name</td>
							<td>{vehicleInfo[73].Value}</td>
						</tr>	
						<tr>
							<td class="fw-bold">Engine Displacement</td>
							<td>{(Math.round(vehicleInfo[71].Value * 10) /10)}L</td>
						</tr>
						<tr>
							<td class="fw-bold">Horsepower</td>
							<td>
								{#if vehicleInfo[80].Value}
									No Horsepower Information Available 😢
								{:else}
									{vehicleInfo[80].Value}
								{/if}
							</td>
						</tr>

					</tbody>


					</table>

					{:else}
						<h3>No Information to Show</h3>
					{/if}
				</div>
			</div>
		</div>



	</div>
</main>
